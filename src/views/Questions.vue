<template>
  <div class="questions">
    <!-- 左栏历史区 -->
    <div class="history-panel">
      <!-- 开启新对话按钮 -->
      <button class="new-talk-btn" @click="createNewConversation">
        <img src="../assets/icons/new_talk.png" alt="new_talk" class="icon">
        开启新对话
      </button>
      
      <!-- 时间小标题 -->
      <div class="time-section">
        <h3>最近对话</h3>
      </div>
      
      <!-- 历史对话条目 -->
      <ul class="conversation-list">
        <li 
          v-for="conversation in conversations" 
          :key="conversation.id"
          class="conversation-item"
          :class="{ active: selectedConversationId === conversation.id }"
          @click="selectConversation(conversation.id)"
        >
          <span class="conversation-title">{{ conversation.title }}</span>
          <button class="delete-btn" @click.stop="confirmDelete(conversation.id)">
            <img src="../assets/icons/delete.png" alt="delete" class="icon">
          </button>
        </li>
      </ul>
    </div>
    
    <!-- 右侧对话区 -->
    <div class="chat-panel">
      <!-- 对话标题 -->
      <div class="chat-header">
        <h2>{{ currentConversation?.title || '新对话' }} <span v-if="jobData" class="job-associated">（当前关联{{ jobData.title }}）</span></h2>
        <!-- 职位信息区域 -->
        <div class="job-info-section" v-if="currentJobData">
          <div class="job-info-header" @click="jobInfoExpanded = !jobInfoExpanded">
            <div class="job-info-header-content">
              <h3>关联职位</h3>
              <span class="job-title-collapsed" v-if="!jobInfoExpanded">{{ currentJobData.title }}</span>
            </div>
            <div class="job-info-actions">
              <button v-if="globalJobData" class="cancel-btn" @click.stop="cancelGlobalJob">取消选择</button>
              <button v-else-if="jobData" class="cancel-btn" @click.stop="cancelJobAssociation">取消关联</button>
              <span class="expand-icon" :class="{ 'expanded': jobInfoExpanded }">▼</span>
            </div>
          </div>
          <div class="job-info-content" v-if="jobInfoExpanded">
            <div class="job-info-item">
              <span class="job-info-label">职位名称：</span>
              <span class="job-info-value">{{ currentJobData.title }}</span>
            </div>
            <div class="job-info-item">
              <span class="job-info-label">公司：</span>
              <span class="job-info-value">{{ currentJobData.company }}</span>
            </div>
            <div class="job-info-item">
              <span class="job-info-label">薪资：</span>
              <span class="job-info-value">{{ currentJobData.salary }}</span>
            </div>
            <div class="job-info-item">
              <span class="job-info-label">地点：</span>
              <span class="job-info-value">{{ currentJobData.location }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 聊天记录 -->
      <div class="chat-messages" ref="chatMessages">
        <div 
          v-for="(message, index) in currentMessages" 
          :key="index"
          class="message"
          :class="{ 'user-message': message.type === 'user', 'bot-message': message.type === 'bot' }"
        >
          <div class="message-content">{{ message.content }}</div>
        </div>
        <!-- 思考过程提示 -->
        <div v-if="isThinking" class="message bot-message thinking">
          <div class="message-content">
            <span class="thinking-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
            <span class="thinking-text">AI正在思考...</span>
          </div>
        </div>
      </div>
      
      <!-- 输入框 -->
      <div class="chat-input-area">
        <!-- 链接职位区 -->
        <div class="link-job-section" v-if="showLinkJob">
          <p>链接职位后，AI将根据职位信息提供更精准的回答</p>
        </div>
        
        <!-- 输入区域 -->
        <div class="input-container">
          <textarea 
            v-model="inputMessage"
            placeholder="请输入您的问题..."
            class="message-input"
            @keyup.enter.exact="sendMessage"
          ></textarea>
        </div>
        
        <!-- 操作区域 -->
        <div class="input-actions">
          <button class="action-btn link-btn" @click="navigateToJobs">
            <img src="../assets/icons/link.png" alt="link" class="icon">
            链接职位
          </button>
          <button class="action-btn send-btn" @click="sendMessage" :disabled="!inputMessage.trim() || isThinking">
            <img v-if="!inputMessage.trim() || isThinking" src="../assets/icons/send.png" alt="send" class="icon">
            <img v-else src="../assets/icons/send_white.png" alt="send" class="icon">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  data() {
    return {
      conversations: this.loadConversations(),
      selectedConversationId: null,
      inputMessage: '',
      showLinkJob: false,
      isThinking: false,
      jobData: null,
      globalJobData: null, // 全局临时性job数据
      jobInfoExpanded: false
    }
  },
  watch: {
    // 监听对话数据变化，自动保存到sessionStorage
    conversations: {
      handler(newConversations) {
        sessionStorage.setItem('questionsConversations', JSON.stringify(newConversations))
      },
      deep: true
    },
    // 监听选中的对话ID变化，自动保存到sessionStorage
    selectedConversationId(newId) {
      sessionStorage.setItem('questionsSelectedConversationId', newId)
    }
  },
  mounted() {
    // 加载选中的对话ID
    const savedSelectedId = sessionStorage.getItem('questionsSelectedConversationId')
    if (savedSelectedId) {
      this.selectedConversationId = parseInt(savedSelectedId)
      // 加载选中对话的jobData
      const selectedConversation = this.conversations.find(c => c.id === this.selectedConversationId)
      if (selectedConversation) {
        this.jobData = selectedConversation.jobData
      }
    }
    
    // 加载从Job页面传输过来的job数据
    const savedJobData = sessionStorage.getItem('questionJobData')
    if (savedJobData) {
      this.globalJobData = JSON.parse(savedJobData)
      // 清除sessionStorage中的job数据，避免下次加载时重复显示
      sessionStorage.removeItem('questionJobData')
    }
  },
  computed: {
    currentConversation() {
      return this.conversations.find(c => c.id === this.selectedConversationId)
    },
    currentMessages() {
      return this.currentConversation?.messages || []
    },
    currentJobData() {
      // 优先使用全局job数据，如果没有则使用当前对话的job数据
      return this.globalJobData || this.jobData
    }
  },
  beforeRouteLeave(to, from, next) {
    // 切换导航时，检查当前对话是否为空的新对话，如果是则删除
    if (this.selectedConversationId) {
      const currentConversation = this.conversations.find(c => c.id === this.selectedConversationId)
      if (currentConversation && currentConversation.title === '新对话' && currentConversation.messages.length === 0) {
        this.conversations = this.conversations.filter(c => c.id !== this.selectedConversationId)
      }
    }
    next()
  },
  methods: {
    // 从sessionStorage加载对话数据
    loadConversations() {
      const savedConversations = sessionStorage.getItem('questionsConversations')
      if (savedConversations) {
        return JSON.parse(savedConversations)
      }
      // 默认对话数据
      return [
        {
          id: 1,
          title: '关于前端开发职位的问题',
          messages: [
            { type: 'user', content: '前端开发需要掌握哪些技能？' },
            { type: 'bot', content: '测试回答' }
          ],
          jobData: null
        },
        {
          id: 2,
          title: '简历撰写技巧',
          messages: [
            { type: 'user', content: '如何撰写一份优秀的简历？' },
            { type: 'bot', content: '测试回答' }
          ],
          jobData: null
        }
      ]
    },
    createNewConversation() {
      // 检查是否已经处于新对话中（标题为'新对话'且无消息）
      const currentConversation = this.conversations.find(c => c.id === this.selectedConversationId)
      if (currentConversation && currentConversation.title === '新对话' && currentConversation.messages.length === 0) {
        return currentConversation // 已经处于新对话中，返回当前对话
      }
      
      const newId = Date.now()
      const newConversation = {
        id: newId,
        title: '新对话',
        messages: [],
      }
      this.conversations.unshift(newConversation)
      this.selectedConversationId = newId
      this.jobData = null
      return newConversation
    },
    selectConversation(id) {
      // 切换对话前，检查当前对话是否为空的新对话，如果是则删除
      if (this.selectedConversationId) {
        const currentConversation = this.conversations.find(c => c.id === this.selectedConversationId)
        if (currentConversation && currentConversation.title === '新对话' && currentConversation.messages.length === 0) {
          this.conversations = this.conversations.filter(c => c.id !== this.selectedConversationId)
        }
      }
      this.selectedConversationId = id
      // 切换对话时，更新jobData为当前对话的jobData
      const selectedConversation = this.conversations.find(c => c.id === id)
      this.jobData = selectedConversation?.jobData || null
    },
    confirmDelete(conversationId) {
      if (confirm('确定要删除这条对话吗？')) {
        const deletedConversation = this.conversations.find(c => c.id === conversationId)
        this.conversations = this.conversations.filter(c => c.id !== conversationId)
        if (this.selectedConversationId === conversationId) {
          this.selectedConversationId = null
          // 如果删除的是当前选中的对话，并且该对话有关联的job，清空jobData
          if (deletedConversation && deletedConversation.jobData) {
            this.jobData = null
          }
        }
      }
    },
    sendMessage() {
      if (!this.inputMessage.trim() || this.isThinking) return
      
      // 如果当前没有选中对话，创建新对话
      let conversation = this.currentConversation
      if (!conversation) {
        conversation = this.createNewConversation()
      }
      
      // 确保conversation存在
      if (!conversation) {
        console.error('Current conversation not found')
        return
      }
      
      // 如果存在全局job数据，将其与当前对话绑定
      if (this.globalJobData) {
        conversation.jobData = this.globalJobData
        this.jobData = this.globalJobData
        this.globalJobData = null // 清空全局job数据
      }
      
      // 添加用户消息
      const userMessage = {
        type: 'user',
        content: this.inputMessage.trim()
      }
      conversation.messages.push(userMessage)
      
      // 如果是新对话的第一条消息，以此命名对话
      if (conversation.title === '新对话' && conversation.messages.length === 1) {
        // 取消息的前20个字符作为对话标题
        const title = this.inputMessage.trim().substring(0, 20) + (this.inputMessage.trim().length > 20 ? '...' : '')
        conversation.title = title
      }
      
      // 清空输入框
      this.inputMessage = ''
      
      // 滚动到底部
      this.scrollToBottom()
      
      // 设置思考状态
      this.isThinking = true
      
      // 模拟思考延时后回答
      setTimeout(() => {
        const botMessage = {
          type: 'bot',
          content: '测试回答'
        }
        conversation.messages.push(botMessage)
        this.isThinking = false
        this.scrollToBottom()
      }, 1000 + Math.random() * 2000)
    },
    navigateToJobs() {
      // 记住当前对话并跳转Job页面
      this.$router.push('/jobs')
    },
    scrollToBottom() {
      setTimeout(() => {
        const chatMessages = this.$refs.chatMessages
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight
        }
      }, 100)
    },
    // 取消全局job选择
    cancelGlobalJob() {
      this.globalJobData = null
    },
    // 取消job关联
    cancelJobAssociation() {
      if (this.currentConversation) {
        this.currentConversation.jobData = null
        this.jobData = null
      }
    }
  },
  beforeUnmount() {
    // 退出页面时，若当前聊天记录无内容，且有关联到对话历史，在历史区删除对应的历史
    if (this.selectedConversationId) {
      const conversation = this.currentConversation
      if (conversation && conversation.messages.length === 0) {
        this.conversations = this.conversations.filter(c => c.id !== this.selectedConversationId)
      }
    }
  }
}
</script>

<style scoped>
.questions {
  display: flex;
  height: 100vh;
  background-color: #f8f9fa;
  padding-top: 60px; /* 考虑导航栏高度 */
  box-sizing: border-box;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.questions::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  z-index: 0;
  pointer-events: none;
}

/* 左栏历史区 */
.history-panel {
  width: 280px;
  background-color: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  padding: 16px;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.history-panel::-webkit-scrollbar {
  display: none;
}

.new-talk-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background-color: var(--qna-accent);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 24px;
}

.new-talk-btn:hover {
  background-color: #c09263;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(192, 146, 99, 0.3);
}

.time-section {
  margin-bottom: 16px;
}

.time-section h3 {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.conversation-list {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}

.conversation-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 12px 16px;
  background-color: transparent;
  margin-bottom: 0;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
  border-left: 3px solid transparent;
  position: relative;
  height: 40px;
  border-bottom: 1px solid #f0f0f0;
}

.conversation-item:hover {
  border-left: 3px solid var(--qna-accent);
  background-color: #f8f9fa;
  transform: none;
  box-shadow: none;
}

.conversation-item.active {
  border-left: 3px solid var(--qna-accent);
  background-color: #f8f9fa;
}

.conversation-item.active .conversation-title {
  color: var(--qna-accent);
  font-weight: bold;
}

.conversation-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.conversation-title {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  transition: color 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.delete-btn {
  display: none;
  align-items: center;
  padding: 4px;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  flex-shrink: 0;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  z-index: 1;
}

.conversation-item:hover .delete-btn {
  display: flex;
}

.delete-btn:hover {
  background-color: rgba(255, 0, 0, 0.1);
  border-color: #ff4d4f;
}

.icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

/* 右侧对话区 */
.chat-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  position: relative;
  z-index: 1;
  margin-left: 1px;
}

.chat-header {
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10;
}

.chat-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
  margin-bottom: 12px;
}

.job-associated {
  font-size: 14px;
  font-weight: normal;
  color: #666;
  margin-left: 8px;
}

.chat-header h2::after {
  display: none;
}

/* 职位信息区域 */
.job-info-section {
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 4px 8px;
  margin-top: 12px;
  transition: all 0.3s;
}

.job-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  padding: 4px 0;
}

.job-info-header-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.job-info-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cancel-btn {
  padding: 4px 8px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
}

.cancel-btn:hover {
  background-color: #f1f1f1;
  border-color: #007bff;
  color: #007bff;
}

.job-info-header h3 {
  margin: 0;
  font-size: 16px;
  color: var(--qna-accent);
  font-weight: 600;
  transition: all 0.3s;
  white-space: nowrap;
}

.job-title-collapsed {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  max-width: 300px;
}

.expand-icon {
  font-size: 12px;
  color: var(--qna-accent);
  transition: transform 0.3s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.job-info-content {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 8px;
}

.job-info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: white;
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex: 1 1 calc(50% - 6px);
  min-width: 200px;
}

.job-info-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
}

.job-info-value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-messages {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: white;
  position: relative;
}

.chat-messages::before {
  display: none;
}

.message {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
  position: relative;
  z-index: 1;
}

.user-message {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  border-bottom-right-radius: 4px;
  margin-left: 20%;
}

.bot-message {
  align-self: flex-start;
  background-color: #f1f1f1;
  color: #333;
  border-bottom-left-radius: 4px;
}

.message-content {
  font-size: 14px;
  color: #333;
}

.user-message .message-content {
  color: white;
}

/* 思考过程提示 */
.thinking {
  display: flex;
  align-items: center;
  gap: 8px;
}

.thinking-dots {
  display: flex;
  gap: 4px;
  animation: dots 1.4s infinite ease-in-out both;
}

.thinking-dots span {
  width: 8px;
  height: 8px;
  background-color: var(--qna-accent);
  border-radius: 50%;
  display: inline-block;
  animation: dot-bounce 1.4s infinite ease-in-out both;
}

.thinking-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.thinking-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

.thinking-text {
  font-size: 14px;
  color: #666;
}

@keyframes dots {
  0%, 80%, 100% {
    transform: scale(0.6);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes dot-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 输入框 */
.chat-input-area {
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
  background-color: white;
  position: sticky;
  bottom: 0;
  z-index: 10;
}

.link-job-section {
  padding: 12px;
  background-color: var(--accent-bg);
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #333;
}

.input-container {
  margin-bottom: 12px;
}

.message-input {
  width: 100%;
  min-height: 60px;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
  max-height: 200px;
  font-family: inherit;
  line-height: 1.5;
  transition: all 0.3s;
  color: #333;
  background-color: white;
}

.message-input::placeholder {
  color: #999;
}

.message-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

.input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
  color: #666;
}

.link-btn:hover {
  background-color: #f1f1f1;
  border-color: #007bff;
  color: #007bff;
}

.send-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.send-btn:hover:not(:disabled) {
  background-color: #0069d9;
  transform: translateY(-1px);
}

.send-btn:disabled {
  background-color: #e0e0e0;
  color: #999;
  cursor: not-allowed;
  transform: none;
  opacity: 0.7;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .questions {
    flex-direction: column;
    height: 100vh;
  }
  
  .history-panel {
    width: 100%;
    height: 30%;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
  
  .chat-panel {
    flex: 1;
  }
  
  .chat-messages {
    padding: 20px;
  }
  
  .chat-input-area {
    padding: 16px 20px;
  }
  
  .message {
    max-width: 90%;
  }
  
  .user-message {
    margin-left: 10%;
  }
}
</style>
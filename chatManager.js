class ChatManager {
  constructor(characterDescription) {
    this._conversation = [
      {
        role: "system",
        content: `character description: ${characterDescription}`,
      },
    ];
  }

  addMessage(role, content) {
    this._conversation.push({ role, content });
  }

  getConversation() {
    return this._conversation.slice(1);
  }

  cleanChatHistory() {
    this._conversation = [this._conversation[0]];
  }

  async getCharacterResponse() {
    const response = await fetch("https://www.infinityg.ai/api/gameChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: this._conversation,
      }),
    });

    const data = await response.json();
    this.addMessage('assistant', data.message);
    return data.message;
  }
}

window.ChatManager = ChatManager;
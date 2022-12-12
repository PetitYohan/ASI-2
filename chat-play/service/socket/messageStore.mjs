/* abstract */ class MessageStore {
	saveMessage(message) {}
	findMessagesForUser(id) {}
}

class InMemoryMessageStore extends MessageStore {
	constructor() {
		super()
		this.messages = []
	}

	saveMessage(message) {
		this.messages.push(message)
	}

	findMessagesForUser(id) {
		return this.messages.filter(({ from, to }) => from === id || to === id)
	}
}

export default InMemoryMessageStore

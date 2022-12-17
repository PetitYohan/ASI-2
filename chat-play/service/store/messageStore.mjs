class InMemoryMessageStore {
	constructor() {
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

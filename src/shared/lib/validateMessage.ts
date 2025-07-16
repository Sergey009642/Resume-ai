function validateMessage(message: string) {
  // Check if the message is empty
  if (!message.length) {
    return true
  }

  // Check if the message is too long
  if (message.length > 1000) {
    return "Message is too long";
  }

  // Check if the message contains any invalid characters
}

export {
    validateMessage
}
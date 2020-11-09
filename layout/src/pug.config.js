function className(className, modifiers = []) {
  return className + ' ' + modifiers.map(x => `${className}--${x}`).join(' ')
}

module.exports = {
  pretty: true,
  locals: {
    cn: className
  }
}

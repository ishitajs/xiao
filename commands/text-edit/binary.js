const Command = require('../../structures/Command');

module.exports = class BinaryCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'binary',
			group: 'text-edit',
			memberName: 'binary',
			description: 'Converts text to binary.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to binary?',
					type: 'string',
					validate: text => {
						if (this.binary(text).length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			]
		});
	}

	run(msg, { text }) {
		return msg.say(this.binary(text));
	}

	binary(text) {
		return text.split('').map(str => {
			const converted = str.charCodeAt(0).toString(2);
			return `${'00000000'.slice(converted.length)}${converted}`;
		}).join('');
	}
};

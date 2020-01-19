class CharEncrypter(object):

	def __init__(self, file_name, _key):
		self.file_name = file_name
		self._key = _key

	def _write(self):
		pass

	def _read(self):
		pass

	def decrypt(self):
		if self.log_on:
			print('Start decripting')
		temp_content = []
		try:
			with open(self.file_name, 'r') as file_object:
				for line in file_object.read().split('\n'):
					if len(line) == 0:
						continue
					temp_line = ''
					for word in line.split():
						if word == 'MI':
							temp_line += ' '
						else:
							temp_line += str(chr(int(int(word) / self._key)))
					temp_content.append(temp_line + '\n')
					if self.log_on:
						print('Line decripted')
			with open(self.file_name, 'w') as file_object:
				# remove last newLine character
				temp_content[-1] = temp_content[-1].replace('\n', '')
				file_object.write(''.join(temp_content))
				if self.log_on:
					print('Decription finished')
		except Exception as e:
			print(e)

	def encrypt(self):
		if self.log_on:
			print('Start encripting')
		temp_content = []
		try:
			with open(self.file_name, 'r') as file_object:
				for line in file_object.read().split('\n'):
					if len(line) == 0:
						continue
					for word in line.split():
						temp = ''
						for index in range(0, len(word)):
							temp += str(ord(word[index]) * self._key) + ' '
						temp_content.append(temp + 'MI' + ' ')
					if self.log_on:
						print('Line encripted')
					temp_content.append('\n')

			with open(self.file_name, 'w') as file_object:
				# remove last newLine character
				temp_content.pop()
				file_object.write(''.join(temp_content))
				if self.log_on:
					print('Encription finished')
		except Exception as e:
			print(e)
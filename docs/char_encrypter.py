class CharEncrypter(object):

	def __init__(self, file_name, _key_file):
		self.file_name = file_name
		self.__SPACE = '0xS'
		self.__ENCRYPT_CERT = '[encrypted with char_encrypter]'
		try:
			with open(_key_file) as key_object:
				self._key = int(key_object.read())
		except Exception as e:
			print(e)

	def _write(self):
		pass

	def _read(self):
		pass

	def decrypt(self):
		if self.log_on:
			print('Start decrypting')
		temp_content = []
		try:
			with open(self.file_name, 'r') as file_object:
				if self.__ENCRYPT_CERT in file_object.readline():
					content = file_object.read().split('\n')
				else:
					print('File is not encrypted')
					raise 
						
				for line in content:
					if len(line) == 0:
						continue
					temp_line = ''
					for word in line.split():
						if word == self.__SPACE:
							temp_line += ' '
						else:
							char_num = int( int(word, 16) / self._key)
							temp_line += str(chr(char_num))

					temp_content.append(temp_line + '\n')
					if self.log_on:
						print('\t- Line decrypted')
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
			print('Start encrypting')
		temp_content = []
		try:
			with open(self.file_name, 'r') as file_object:
				content = file_object.read().split('\n')
				if self.__ENCRYPT_CERT in content[0]:
					print('File is already encrypted')
					raise

				for line in content:
					if len(line) == 0:
						continue
					for word in line.split():
						temp = ''
						for index in range(0, len(word)):
							char_num = ord(word[index])
							temp += str(hex(char_num * self._key)) + ' '
						temp_content.append(temp + self.__SPACE + ' ')
					if self.log_on:
						print('\t- Line encrypted')
					temp_content.append('\n')

			with open(self.file_name, 'w') as file_object:
				# remove last newLine character
				temp_content.pop()
				file_object.write(self.__ENCRYPT_CERT + '\n')
				file_object.write(''.join(temp_content))
				if self.log_on:
					print('Encryption finished')
		except Exception as e:
			print(e)
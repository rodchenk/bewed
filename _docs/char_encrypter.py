from datetime import datetime as time
"""Author Mischa Rodchenkov, https://github.com/rodchenk"""
class CharEncrypter(object):
	"""Object-wrapper for file to be encrypted or decrypted with simple algorithm based on char to integer convertation with user specific key-translation"""
	def __init__(self, file_name, _key_file=None):
		"""Constructor method for CharEncrypter. Arguments: file_name -> file you want to crypt, _key_file -> file with your unique key(int). If no key is provided, char index will be the same. Set log_on to True to see the logs"""
		self.file_name = file_name
		self.__SPACE = '0xS'
		self.__ENCRYPT_CERT = '[encrypted with char_encrypter]'
		if _key_file:
			try:
				with open(_key_file) as key_object:
					self._key = int(key_object.read())
			except Exception as e:
				print(e)
		else:
			self._key = 1

	def _log(self, message):
		if self.log_on: 
			_now = time.now()
			print('%s:%s:%s -> %s'%(_now.hour, _now.minute, _now.second, message))

	def decrypt(self):
		"""Method translate ecrypted file to noraml test object. If file is not encrypted, an Exception will be thrown"""
		self._log('Start decrypting')
		temp_content = []
		try:
			with open(self.file_name, 'r') as file_object:
				if self.__ENCRYPT_CERT in file_object.readline():
					content = file_object.read().split('\n')
				else:
					print('File is not encrypted')
					raise 
						
				for line in content:
					temp_line = ''
					for word in line.split():
						if word == self.__SPACE:
							temp_line += ' '
						else:
							char_num = int( int(word, 16) / self._key)
							temp_line += str(chr(char_num))

					temp_content.append(temp_line + '\n')
					self._log('\t- Line decrypted')
			with open(self.file_name, 'w') as file_object:
				# remove last newLine character
				temp_content[-1] = temp_content[-1].replace('\n', '')
				file_object.write(''.join(temp_content))
				self._log('Decription finished')
		except Exception as e:
			print(e)

	def encrypt(self):
		"""Method ecrypts file. If file already is encrypted, an Exception will be thrown"""
		self._log('Start encrypting')
		temp_content = []
		try:
			with open(self.file_name, 'r') as file_object:
				content = file_object.read().split('\n')
				if self.__ENCRYPT_CERT in content[0]:
					print('File is already encrypted')
					raise

				for line in content:
					for word in line.split():
						temp = ''
						for index in range(0, len(word)):
							char_num = ord(word[index])
							temp += str(hex(char_num * self._key)) + ' '
						temp_content.append(temp + self.__SPACE + ' ')
					self._log('\t- Line encrypted')
					temp_content.append('\n')

			with open(self.file_name, 'w') as file_object:
				# remove last newLine character
				temp_content.pop()
				file_object.write(self.__ENCRYPT_CERT + '\n')
				file_object.write(''.join(temp_content))
				self._log('Encryption finished')
		except Exception as e:
			print(e)
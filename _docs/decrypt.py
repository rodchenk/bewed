from char_encrypter import CharEncrypter as Encrypter

f = Encrypter('requirements.md', 'key.m')
f.log_on = True
f.decrypt()
define(['./cryptojs/crypto-js','./cryptojs/aes'], function(CryptoJS) {
	
	var CIPHER_ALG =  {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		};
	
	function AESUtil(key) {
		this.key = CryptoJS.enc.Utf8.parse(key);
	}

	getAesString = function getAesString(data,key) { //加密
		var encrypted = CryptoJS.AES.encrypt(data, key,CIPHER_ALG);
		return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
	}

	function getDAesString(data, key) { //解密
		var decrypted = CryptoJS.AES.decrypt(data, key, CIPHER_ALG);
		return decrypted.toString(CryptoJS.enc.Utf8);
	}

	AESUtil.prototype.encrypt = function(data) { //加密
		return getAesString(data, this.key); //密文
	}

	AESUtil.prototype.decrypt = function decrypt(encryptedData)  { //解密
		return getDAesString(encryptedData, this.key);
	}

	return AESUtil;

})
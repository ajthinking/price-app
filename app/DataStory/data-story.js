const payload = process.argv[2];
const name_ = payload ?? 'Anonymous'

console.info(JSON.stringify({
	message: name_ + ' is cool!',
}))
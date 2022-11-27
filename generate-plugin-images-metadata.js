const {readdirSync, writeFileSync} = require('fs')
const {join} = require ('path')
const sizeOf =  require('image-size')

const files = readdirSync(join(process.cwd(), 'public', 'store'))

const metadata = []

for (const filename of files) {
    const dimensions = sizeOf(
        join(process.cwd(), 'public', 'store', filename)
    )

    const imageInfo = {
        src: `/store/${filename}`,
        isGIF: filename.split('.').pop() == 'gif',
        width: dimensions.width,
        height: dimensions.height,
    }

    metadata.push(imageInfo);
}

writeFileSync('plugin-images-metadata.json', JSON.stringify(metadata, null, 2))

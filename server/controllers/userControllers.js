const imagekit = require("../helpers/imagekit");
const { Item, Image } = require('../models')

class userControllers {
    static async postItems(req, res, next) {
        try {
            const { files } = req
            const {
                title,
                category,
                description,
                brand,
                yearOfPurchase,
                dateExpired,
                statusPost,
                myAdsId,
                UserId,
                imageId } = req.body

            const createItems = await Item.create({
                title,
                category,
                description,
                brand,
                yearOfPurchase,
                dateExpired,
                statusPost,
                myAdsId,
                UserId,
                imageId
            })

            files.forEach((file) => {
                imagekit.upload({
                    file: file.buffer,
                    fileName: `my_file_name.jpg`,
                    extensions: [
                        {
                            name: "google-auto-tagging",
                            maxTags: 5,
                            minConfidence: 95
                        }
                    ]
                })
                    .then(data => {
                        console.log(data)
                        if (data.AITags === null) {
                            Image.create({
                                imageUrl: data.url,
                                itemId: createItems.id,
                                tag: ''
                            })
                        }
                        else {
                            let tags = []
                            data.AITags.forEach(e => {
                                tags.push(e.name)
                            })
                            Image.create({
                                imageUrl: data.url,
                                itemId: createItems.id,
                                tag: tags.join(', ')
                            })
                        }
                    })

            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = userControllers
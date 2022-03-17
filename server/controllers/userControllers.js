const imagekit = require("../helpers/imagekit");
const uploadFile = require("../helpers/uploadFile");
const { Item, Image, sequelize } = require('../models')

class userControllers {
    static async postItems(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const imageData = []
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
            }, { transaction: t })

            files.forEach(async (file) => {
                uploadFile(file)
                    .then(data => {
                        let tags = []
                        if (data.AITags) {
                            data.AITags.forEach(e => {
                                tags.push(e.name)
                            })
                        }
                        imageData.push({
                            imageUrl: data.url,
                            itemId: createItems.id,
                            tag: tags.join(', ')
                        })
                    })
            })
            await t.commit();
            res.status(201).send(createItems)
        } catch (error) {
            await t.rollback();
            next(error)
        }
    }
}

module.exports = userControllers
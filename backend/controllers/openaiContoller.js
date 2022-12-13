const { Configuration, OpenAIApi } = require('openai');
const { body, validationResult } = require('express-validator')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const generateImage = async (req, res) => {
    console.log(req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { prompt, size, n } = req.body;
    n = parseInt(n)
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'
    try {
        const response = await openai.createImage({
            prompt,
            n,
            size: imageSize
        })
        const imageUrl = response.data.data
        return res.status(200).json({
            success: true,
            data: imageUrl
        })
    } catch (error) {
        if (error.response) {
            console.log(error.response.status)
            console.log(error.response.data)
        } else {
            console.log(error.message)
        }
        return res.status(400).json({
            success: false,
            error: 'The image could not be generated'
        })
    }
}

module.exports = { generateImage }
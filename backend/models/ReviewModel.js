const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
 

    review: {
      type: String,
      required: [true, 'Please provide review text'],
    },

    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide user name'],      
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },

    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    }
  });


  ReviewSchema.statics.calculateAverageRating = async function (productId) {
    const result = await this.aggregate([
      { $match: { product: productId } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' },
          numOfReviews: { $sum: 1 },
        },
      },
    ]);
  
    try {
      await this.model('Product').findOneAndUpdate(
        { _id: productId },
        {
          ratings: Math.ceil(result[0].averageRating || 0),
          numOfReviews: result[0].numOfReviews || 0,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  ReviewSchema.post('save', async function () {
    await this.constructor.calculateAverageRating(this.product);
  });

module.exports = mongoose.model("Review", ReviewSchema);

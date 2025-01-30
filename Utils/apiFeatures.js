class ApiFeatures {
  constructor(MongooseQuery, queryString) {
    this.MongooseQuery = MongooseQuery;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((field) => delete queryObj[field]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    this.MongooseQuery = this.MongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.MongooseQuery = this.MongooseQuery.sort(sortBy);
    } else {
      this.MongooseQuery = this.MongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.MongooseQuery = this.MongooseQuery.select(fields);
    } else {
      this.MongooseQuery = this.MongooseQuery.select("-__v");
    }
    return this;
  }
  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};

      if (modelName === "Product") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: "i" } };
      }

      this.MongooseQuery = this.MongooseQuery.find(query);
    }
    return this;
  }

  paginate(countDocuments) {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 50;
    const skip = (page - 1) * limit;
    const endPage = page * limit;

    // pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);

    //next page
    if (endPage < countDocuments) {
      pagination.next = page + 1;
    }

    //prev page
    if (page > 0) {
      pagination.prev = page - 1;
    }
    this.MongooseQuery = this.MongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;

    return this;
  }
}

module.exports = ApiFeatures;

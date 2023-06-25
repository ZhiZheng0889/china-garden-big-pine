const pagination = parseInt(process.env.PAGINATION);

const getTotal = async (model, conditonal) => {
  return model.countDocuments(conditonal);
};

const getPageAmount = (total) => {
  return Math.ceil(total / pagination);
};

const pageable = async (model, conditonal, page) => {
  const results = await model
    .find(conditonal)
    .skip((page - 1) * pagination)
    .limit(pagination);
  const total = await getTotal(model, conditonal);
  return {
    results,
    pagination,
    page,
    totalPage: getPageAmount(total),
  };
};

const Pagination = {
  pageable,
};

Object.freeze(Pagination);

module.exports = Pagination;

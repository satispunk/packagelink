const publishProperty = {
  properties: {
    packages: {
      type: 'array',
      items: {type: 'string'},
      uniqueItems: true,
    },
  },
  required: ['packages'],
  additionalProperties: false,
};

const installProperty = {
  properties: {
    dependencies: {
      type: 'array',
      items: {type: 'string'},
      uniqueItems: true,
    },
    devDependencies: {
      type: 'array',
      items: {type: 'string'},
      uniqueItems: true,
    },
  },
  additionalProperties: false,
};

export const publishSchema = {
  title: 'packagelink',
  description: 'packagelink publish config',
  properties: {
    publish: publishProperty,
    install: installProperty,
  },
  additionalProperties: false,
};

export const installSchema = {
  title: 'packagelink',
  description: 'packagelink install config',
  properties: {
    publish: publishProperty,
    install: installProperty,
  },
  additionalProperties: false,
};

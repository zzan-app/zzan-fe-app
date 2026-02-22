const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg'],

    // Exclude mock files from production builds
    resolveRequest: (context, moduleName, platform) => {
      // Check if this is a production build (mock data disabled)
      const isProduction = process.env.EXPO_PUBLIC_USE_MOCK_DATA !== 'true';

      // If production build and importing a mock file, return empty module
      if (isProduction && moduleName.endsWith('/mock')) {
        return { type: 'empty' };
      }

      // Otherwise, use default resolution
      return context.resolveRequest(context, moduleName, platform);
    },
  };

  return config;
})();
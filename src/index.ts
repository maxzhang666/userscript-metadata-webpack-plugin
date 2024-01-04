import { userscriptMetadataGenerator } from 'userscript-metadata-generator';
import { createFilter } from '@rollup/pluginutils';

export default function UserScriptMetaDataPlugin(options = {
  metadata: false, test: undefined,

}) {
  if (!options.metadata) {
    throw new TypeError('Must pass "metadata"');
  }

  // @ts-ignore
  const header = userscriptMetadataGenerator(options.metadata) + '\n\n';
  const filter = createFilter(options.test || /\.user\.js$/, []);

  // debugger
  console.log(`插件执行`);
  return {
    name: 'userscript-metadata-plugin',
    renderChunk(code: string, chunk: { fileName: unknown; }, outputOptions: any) {
      if (filter(chunk.fileName)) {
        return header + code;
      }
      return null; // 如果不匹配，则不修改代码块
    },
  };
}

import tsNode from 'ts-node';
import testTSConfig from './test/tsconfig.json' assert {type:"json"};

tsNode.register({
	files: true,
	transpileOnly: true,
	project: './test/tsconfig.json'
});
import { transform } from 'babel-core';
import { expect } from 'chai';
import { minify } from 'uglify-js-harmony';

const uglify = code => minify(code, {
    fromString: true,
    mangle: false
}).code;

const config = {
    plugins: [
        './src',
        [ 'transform-react-jsx', { pragma: 'j' } ]
    ]
};

const configWithoutPlugin = {
    plugins: [
        [ 'transform-react-jsx', { pragma: 'j' } ]
    ]
};

describe('babel-plugin-transform-jsx-ref-to-function', () => {
    it('should ignores other attributes', () => {
        const code = '<div className="some-className" size="m" />';
        const actual = transform(code, config).code;
        const expected = transform(code, configWithoutPlugin).code;

        expect(actual).to.equal(expected);
    });

    it('should ignores ref with non-string value', () => {
        const code = '<div ref={(el) => this._el = el} />';
        const actual = transform(code, config).code;
        const expected = transform(code, configWithoutPlugin).code;

        expect(actual).to.equal(expected);
    });

    it('should replaces string value to function', () => {
        const code = '<div ref="input" />';
        const expectedCode = '<div ref={el => this["input"] = el} />';
        const actual = transform(code, config).code;
        const expected = transform(expectedCode, configWithoutPlugin).code;

        expect(uglify(actual)).to.equal(uglify(expected));
    });
});

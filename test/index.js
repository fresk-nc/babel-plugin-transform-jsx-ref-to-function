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
    it('should not replace other attributes', () => {
        const code = '<div className="some-className" size="m" />';
        const actual = transform(code, config).code;
        const expected = transform(code, configWithoutPlugin).code;

        expect(actual).to.equal(expected);
    });

    it('should not replace ref that contains function', () => {
        const code = '<div ref={(el) => this._el = el} />';
        const actual = transform(code, config).code;
        const expected = transform(code, configWithoutPlugin).code;

        expect(actual).to.equal(expected);
    });

    it('should replace string value of the ref to function', () => {
        const code = `var Button = {
            render() {
                return <div ref="input" />;
            }
        }`;
        const expectedCode = `var Button = {
            render() {
                return <div ref={el => this['input'] = el} />;
            }
        }`;
        const actual = transform(code, config).code;
        const expected = transform(expectedCode, configWithoutPlugin).code;

        expect(uglify(actual)).to.equal(uglify(expected));
    });
});

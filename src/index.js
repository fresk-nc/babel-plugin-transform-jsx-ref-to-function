export default ({ types: t }) => {
    return {
        visitor: {
            JSXAttribute(path) {
                if (!t.isJSXIdentifier(path.node.name, { name: 'ref' }) ||
                    !t.isStringLiteral(path.node.value)
                ) {
                    return;
                }

                path.replaceWith(
                    t.JSXAttribute(
                        t.JSXIdentifier(path.node.name.name),
                        t.JSXExpressionContainer(
                            t.arrowFunctionExpression(
                                [ t.identifier('el') ],
                                t.assignmentExpression(
                                    '=',
                                    t.memberExpression(
                                        t.thisExpression(),
                                        t.stringLiteral(path.node.value.value),
                                        true
                                    ),
                                    t.identifier('el')
                                )
                            )
                        )
                    )
                );
            }
        }
    };
};

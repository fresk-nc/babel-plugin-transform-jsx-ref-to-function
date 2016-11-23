function isComponent(node) {
    const firstLetter = node.name.name[0];
    return firstLetter === firstLetter.toUpperCase();
}

export default ({ types: t }) => {
    return {
        visitor: {
            JSXAttribute(path) {
                if (!t.isJSXIdentifier(path.node.name, { name: 'ref' }) ||
                    !t.isStringLiteral(path.node.value) ||
                    isComponent(path.parent)
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

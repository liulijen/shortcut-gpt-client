// Source: https://svelte.dev/repl/acd92c9726634ec7b3d8f5f759824d15?version=4.2.1
export const shortcut = (node, params) => {
    let handler;
    const removeHandler = () => window.removeEventListener('keydown', handler);
    
    const setHandler = (newParams) => {
        removeHandler();
        if (!newParams)
            return;
        handler = (e) => {
            if ((!!newParams.alt != e.altKey) ||
                (!!newParams.shift != e.shiftKey) ||
                (!!newParams.control != (e.ctrlKey || e.metaKey)) ||
                newParams.code != e.code)
                return;
            e.preventDefault();
            newParams.callback ? newParams.callback() : node.click();
        };
        window.addEventListener('keydown', handler);
    };
    
    setHandler(params);
    
    return {
        update: (newParams) => setHandler(newParams),
        destroy: removeHandler,
    };
};

import React, { createRef } from 'react';
import ParamEditor, {Model, Param} from './ParamEditor';

const params: Param[] = [
    { id: 1, name: "Назначение", type: 'string' },
    { id: 2, name: "Длина", type: 'string' },
];

const model: Model = {
    paramValues: [
        { paramId: 1, value: "повседневное" },
        { paramId: 2, value: "макси" },
    ],
    colors: [],
};

function App() {
    const editorRef = createRef<ParamEditor>();

    const handleGetModel = () => {
        const model = editorRef.current?.getModel();
        console.log('Model:', model);
    };

    return (
        <div>
            <h2>Редактор параметров</h2>
            <ParamEditor ref={editorRef} params={params} model={model} />
            <button onClick={handleGetModel} style={{ marginTop: 16 }}>
                Получить модель
            </button>
        </div>
    );
}

export default App;

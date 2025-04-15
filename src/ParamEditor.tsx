import React from 'react';

export interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Color {}

export interface Model {
    paramValues: ParamValue[];
    colors: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    values: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            values: props.params.map((param) => {
                const existing = props.model.paramValues.find((v) => v.paramId === param.id);
                return {
                    paramId: param.id,
                    value: existing?.value || '',
                };
            }),
        };
    }

    handleChange = (paramId: number, value: string) => {
        this.setState((state) => ({
            values: state.values.map((v) =>
                v.paramId === paramId ? { ...v, value } : v
            ),
        }));
    };

    public getModel(): Model {
        return {
            paramValues: this.state.values,
            colors: this.props.model.colors || [],
        };
    }

    render() {
        return (
            <div>
                {this.props.params.map((param) => {
                    const value = this.state.values.find((v) => v.paramId === param.id)?.value || '';
                    const inputId = `param-${param.id}`;
                    return (
                        <div key={param.id} style={{ display: 'flex', justifyContent: 'space-between', width: '256px', marginBottom: 8 }}>
                            <label htmlFor={inputId}>{param.name}:</label>{' '}
                            <input
                                id={inputId}
                                type="text"
                                value={value}
                                onChange={(e) => this.handleChange(param.id, e.target.value)}
                            />
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default ParamEditor;

import React from 'react'
import { GridDappletComponent } from './gridDappletComponent'
import { PlainMustacheComponent } from './plainMustacheComponent'

interface IProps {
  templates: { [globalName: string]: any }
  data: { [key: string]: any }
}
interface IState { }

const FrameComponent: React.CSSProperties = {
  padding: 15,
  backgroundColor: "#fff",
  borderRadius: 5,
  border: "solid 1px #ccc",
  marginBottom: 15
}

export class DappletFrameComponent extends React.Component<IProps, IState> {
  private _getCompatibleView() {
    const { templates, data } = this.props
    const globalNames = Object.getOwnPropertyNames(templates)

    for (const gn of globalNames) {
      if (GridDappletComponent.TARGET_VIEW_GLOBAL_NAME === gn) return <GridDappletComponent template={templates[gn]} data={data}/>
      if (PlainMustacheComponent.TARGET_VIEW_GLOBAL_NAME === gn) return <PlainMustacheComponent template={templates[gn]} data={data}/>
    }

    return <div>Incompatible view</div>
  }

  render() {
    return (<div style={FrameComponent}>{this._getCompatibleView()}</div>)
  }
}

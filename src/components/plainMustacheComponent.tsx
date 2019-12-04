import React from 'react'

interface IProps {
  template: string
  data: { [key: string]: any }
}
interface IState { }

export class PlainMustacheComponent extends React.Component<IProps, IState> {
  public static TARGET_VIEW_GLOBAL_NAME = "http://types.dapplets.org/view/plain-mustache/1.0"

  private _replaceMustache(template: string): string {
    const r = /{{\s*([\w\.]+)\s*}}/g
    let m: RegExpExecArray | null
    while ((m = r.exec(template)) !== null) {
      const value = this.props.data[m[1]]
      // ToDo: check types
      if (value && value[0] && typeof value[0] === "string") {
        template = template.replace(m[0], value[0])
      }
    }
    return template
  }

  render() {
    const replacedTemplate = this._replaceMustache(this.props.template)
    return (<div>{replacedTemplate}</div>)
  }
}

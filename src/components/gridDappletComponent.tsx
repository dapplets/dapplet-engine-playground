import React from 'react'

type GridMustacheTemplate = (string | GridMustacheTemplate)[]

type HtmlCssParser = {
  css: string
  html: string
  classes: string[]
  my: string
}

interface IProps {
  template: GridMustacheTemplate
  data: { [key: string]: any }
}
interface IState { }

export class GridDappletComponent extends React.Component<IProps, IState> {
  public static TARGET_VIEW_GLOBAL_NAME = "http://types.dapplets.org/view/grid-mustache/1.0"

  private _parseRow(template: GridMustacheTemplate): GridMustacheTemplate {
    for (let i = 0; i < template.length; i++) {
      const cell = template[i]
      if (typeof cell === "string") {
        template[i] = this._replaceMustache(cell)
      } else {
        template[i] = this._parseRow(cell)
      }
    }

    return template
  }

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

  private _buildComponents(template: GridMustacheTemplate, isRow?: boolean, prefix?: string) {
    console.log(template);
    if (!prefix) prefix = "cell"
    const result: HtmlCssParser = {
      css: "",
      html: "",
      classes: [],
      my: prefix
    }

    if (!Array.isArray(template)) return result

    for (let i = 0; i < template.length; i++) {
      const row = template[i]
      const r = prefix + i
      if (Array.isArray(row)) {
        var subresult = this._buildComponents(row, !isRow, r)
        result.css += subresult.css
        result.html += subresult.html
        result.classes.push(subresult.my)
      } else {
        if (row.split("").map(v => v === "<").reduce((a, v) => a && v)) {
          for (let j = 0; j < row.length; j++) {
            result.classes.push(result.classes[result.classes.length - 1])
          }
          continue
        }
        result.classes.push(r)
        result.css += `.${r} { grid-area: ${r}; }\r\n`
        result.html += `<div class="${r}">${row}</div>\r\n`
      }
    }

    result.html = `<div class="${result.my}">${result.html}</div>`
    var areas = !!isRow ? `"${result.classes.join(" ")}"` : result.classes.map(c => '"' + c + '"').join(" ")
    result.css = `.${result.my} { 
      display: grid; 
      grid-area: ${result.my}; 
      grid-template-areas: ${areas};
      grid-auto-columns: 1fr;
    }\r\n` + result.css

    return result
  }

  render() {
    const replacedTemplate = this._parseRow(this.props.template)
    const built = this._buildComponents(replacedTemplate)
    return (<div>
      <style>{built.css}</style>
      <div dangerouslySetInnerHTML={{ __html: built.html }}></div>
    </div>)
  }
}

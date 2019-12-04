import React from 'react'
import { DappletFrameComponent } from './dappletFrameComponent'

interface IProps {
  frames: { templates: { [globalName: string]: any }, data: { [key: string]: any } }[]
}
interface IState { }

export class DappletViewComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
  }

  render() {
    const { frames } = this.props

    return (<div>
      {frames.map((f, i) => (<DappletFrameComponent key={i} templates={f.templates} data={f.data} />))}
    </div>)
  }
}

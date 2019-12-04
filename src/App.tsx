import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DappletContext, extensions } from '@dapplets/dapplet-engine-ts'
import { TestDappletProvider } from './dapplets/testDappletProvider';
import { WalletEthSigner } from './dapplets/walletEthSigner';
import * as cbor from 'cbor'
import { DappletViewComponent } from './components/dappletViewComponent'

interface IProps {
}

interface IState {
  frames: { templates: { [globalName: string]: any }, data: { [key: string]: any } }[]
  isLoading: boolean
}

export default class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      frames: [],
      isLoading: true
    }
  }

  componentDidMount() {
    const context = new DappletContext({
      providers: [new TestDappletProvider()],
      extensions: [new extensions.EthereumExtension()],
      views: [
        extensions.views.gridMustache.GridMustacheView,
        extensions.views.plainMustache.PlainMustacheView
      ]
    })

    const TX_META = [
      1162074690288005122,
      "Let us create an open directory for speaker applications for conferences. Organizers can pick bests and community will see the whole offer. \n \nI suppose @EFDevcon was unable to select #devcon5 speakers by value and did it by speakers publicity. \n\nI would see rejected applications",
      "Dmitry Palchun",
      "@Ethernian",
      "https://pbs.twimg.com/profile_images/814615689868836864/cyMqCC1B_bigger.jpg"
    ]
    const DAPPLET_REQUEST = [0, [["5"], ["4", TX_META]]]

    const bin = cbor.encode(DAPPLET_REQUEST)
    context.processRequest(bin, {
      onDappletRequest: () => {
        this.setState({ isLoading: false })
      },
      onViewChanged: (frames) => {
        this.setState({ frames })
      }
    }).then(console.log)
  }

  render() {
    const { isLoading, frames } = this.state

    return <div>
      <h1>Dapplet Request</h1>
      {isLoading ? "Dapplet loading..." : <DappletViewComponent frames={this.state.frames} />}
    </div>
  }
}

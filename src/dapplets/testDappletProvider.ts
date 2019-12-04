// import fs from "fs"
import { DappletProvider } from '@dapplets/dapplet-engine-ts/src/interfaces/dappletProvider'
import { DappletTemplate } from '@dapplets/dapplet-engine-ts/src/types/dappletTemplate'
import * as dapplet_4 from './dapplets/4.json'
import * as dapplet_5 from './dapplets/5.json'
import * as dapplet_6 from './dapplets/6.json'
import * as dapplet_7 from './dapplets/7.json'

export class TestDappletProvider implements DappletProvider {
  async loadDapplet(id: string): Promise<DappletTemplate> {
    return new Promise((resolve, reject) => {
      const dapplet = this._getDapplet(id)
      setTimeout(() => resolve(dapplet), 1500)
    })    
  }

  private _getDapplet(id: string): DappletTemplate {
    if (id === "4") return (dapplet_4 as any)["default"]
    if (id === "5") return (dapplet_5 as any)["default"]
    if (id === "6") return (dapplet_6 as any)["default"]
    if (id === "7") return (dapplet_7 as any)["default"]
    throw Error("no")
  }
}
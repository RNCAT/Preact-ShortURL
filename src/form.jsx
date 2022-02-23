import { Component } from 'preact'
import axios from 'redaxios'
import './assets/form.css'

export class Form extends Component {
  state = { long_url: '', short_url: '' }
  bitlyAPI = 'https://api-ssl.bitly.com/v4/shorten'
  isShort = false

  onClick = async () => {
    try {
      const shortURL = await axios.post(
        this.bitlyAPI,
        { long_url: this.state.long_url },
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_BITLY_TOKEN}` },
        }
      )

      this.setState({ short_url: shortURL.data.link })

      this.isShort = true

      document.getElementById('long_url').setAttribute('disabled', '')
      document.getElementById('btn_short').setAttribute('disabled', '')
    } catch (error) {
      console.log(error)
    }
  }

  onInput = (e) => {
    this.setState({ long_url: e.target.value })
  }

  copyLink = () => {
    let copy = document.getElementById('short_url')
    copy.select()
    navigator.clipboard.writeText(copy.value)
  }

  resultShort = (props) => {
    if (this.isShort) {
      return (
        <div>
          <input className="input-block" type="text" value={this.state.short_url} id="short_url" />

          <button className="btn-block btn-success" onClick={this.copyLink}>
            COPY!
          </button>
        </div>
      )
    }
  }

  render(_, { long_url }) {
    return (
      <div id="main" className="card">
        <div className="card-body">
          <h4 class="card-title">URL Shortener</h4>
          <h5 class="card-subtitle">Preact + Vite + PaperCSS</h5>

          <div className="form-group margin">
            <input
              className="input-block "
              type="text"
              value={long_url}
              placeholder="https://"
              onInput={this.onInput}
              id="long_url"
            />
            <button id="btn_short" className="btn-block btn-secondary" onClick={this.onClick}>
              SHORT!
            </button>

            <this.resultShort />
          </div>
        </div>
        <div class="card-footer">
          <a href="https://github.com/RNCAT" style="text-decoration: none">
            RennyCat
          </a>
        </div>
      </div>
    )
  }
}

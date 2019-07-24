import React from 'react'
import GameBoard from './components/GameBoard'
import './App.css'

import withLocalStateLogic from './containers/withLocalStateLogic'
// import withReduxLogic from './containers/withReduxLogic'
// import withApolloLogic from './containers/withApolloLogic'

const Game = withLocalStateLogic(GameBoard)
// const Game = withReduxLogic(GameBoard)
// const Game = withApolloLogic(GameBoard)

const App = () =>
    <div className={'MonsterBattle'}>
        <header className={'MonsterBattle-header'}>
            <h1 className={'MonsterBattle-header-title'}>Monster Battle!</h1>
        </header>
        <Game/>
    </div>

export default App

import {Route, Routes} from 'react-router-dom'

import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Detail from '../pages/Detail'

const Routess = () => {
    return (
        <Routes>
            <Route path='/:category/search/:keyword' element={<Catalog />} />
            <Route path='/:category/:id' element={<Detail />} />
            <Route path='/:category' element={<Catalog />} />
            <Route exact path='/' element={<Home />} />
        </Routes>
    )
}

export default Routess
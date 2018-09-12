module.exports =  {
    config: {
        repository: process.env.NODE_ENV === 'test' ? 
            require('../api/repositories/mockedRepository') : require('../api/repositories/fileRepository')
    }
}
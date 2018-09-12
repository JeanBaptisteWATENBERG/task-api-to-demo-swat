describe('Tasks controller', () => {

    const req = {swagger: {params:{}}};
    const jsonResMocked = jest.fn();
    const res = {json: jsonResMocked, status: 0};
    const SUT = require('./tasks.js');

    it('should create task delegate creation to repository', () => {
        //S 
        req.swagger.params.body = {value: 'test'}
        //E
        SUT.createTasks(req, res);
        //V
        expect(SUT.config.repository.insert).toHaveBeenCalledWith('test')
    });

});
describe('Tasks controller', () => {

    const req = {swagger: {params:{}}};
    const jsonResMocked = jest.fn();
    const res = {json: jsonResMocked, status: 0};
    const SUT = require('./tasks.js');

    it('should create task delegate creation to repository', () => {
        //S 
        const expectedParameter = 'test';
        const expectedResponse = 'createdTask';
        req.swagger.params.body = {value: expectedParameter}
        SUT.config.repository.insert.mockReturnValue(expectedResponse);
        //E
        SUT.createTasks(req, res);
        //V
        expect(SUT.config.repository.insert).toHaveBeenCalledTimes(1)
        expect(SUT.config.repository.insert).toHaveBeenCalledWith(expectedParameter)
        expect(jsonResMocked).toHaveBeenCalledTimes(1)
        expect(jsonResMocked).toHaveBeenCalledWith(expectedResponse)
    });

    it ('should getTasks delegate get to repository', () => {
        //S 
        const expectedTitle = 'title';
        const expectedStatus = 'status';
        const expectedResponse = 'response';
        req.swagger.params.title = {value: expectedTitle}
        req.swagger.params.status = {value: expectedStatus}
        SUT.config.repository.getByStatusAndTitle(expectedResponse);
        //E
        SUT.getTasks(req, res);
        //V
        expect(SUT.config.repository.getByStatusAndTitle).toHaveBeenCalledTimes(1)
        expect(SUT.config.repository.getByStatusAndTitle).toHaveBeenCalledWith(expectedStatus, expectedTitle)
        expect(jsonResMocked).toHaveBeenCalledTimes(1)
        expect(jsonResMocked).toHaveBeenCalledWith(expectedResponse)
    });

});
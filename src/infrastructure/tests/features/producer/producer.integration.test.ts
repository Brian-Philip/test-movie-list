import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('Producer - Endpoint', () => {
    describe('GET /producer/getIntervalWinners', () => {
        it('should return the correct min and max interval winners', done => {
            chai.request('http://localhost:3000').get('/producer/getIntervalWinners')
                .end((err: any, res: any) => {
                    res.should.have.status(200);
                    chai.assert.isNull(err);
                    chai.assert.isNotEmpty(res.body);
                    res.body.should.have.property('min');
                    res.body.should.have.property('max');
                    res.body.min.should.be.a('array');
                    res.body.max.should.be.a('array');
                    res.body.max.should.have.property('length').equal(1);
                    for (const element of res.body.max) {
                        const intervalData = element;
                        intervalData.should.have.property('producer').equal('Matthew Vaughn');
                        intervalData.should.have.property('interval').equal(13);
                        intervalData.should.have.property('previousWin').equal(2002);
                        intervalData.should.have.property('followingWin').equal(2015);
                    }
                    for (const element of res.body.min) {
                        const intervalData = element;
                        intervalData.should.have.property('producer').equal('Joel Silver');
                        intervalData.should.have.property('interval').equal(1);
                        intervalData.should.have.property('previousWin').equal(1990);
                        intervalData.should.have.property('followingWin').equal(1991);
                    }
                    done();
                });
        });

    });
});
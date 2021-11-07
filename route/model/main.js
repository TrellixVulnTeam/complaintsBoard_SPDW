var db=require('../../db');
var promise=require('promise');

exports.main=(req,res)=>{
        console.log("get main");
        if(req.session.displayname){
                var dname=req.session.displayname;
                res.render('main',{name:dname});
        }else{
                res.render('main.jade');
        }
}

exports.notice=(req,res)=>{
        console.log("get notice");
        if(req.session.displayname){
                var dname=req.session.displayname;
                res.render('notice',{name:dname});
        }else{
                res.render('notice');
        }
}

exports.minboard=(req,res)=>{
        var maxpost=10; //페이지당 상품수
        var pno=req.query.page; //페이지넘버
        var val=req.query.val;

        var query=req.query;
        if(!pno)  var pno=1;
        var start=maxpost*pno-maxpost;
        if(val){
                sql = sql + " where title like '%" + val + "%'";
        }
        var sql="select count(*) as postcnt from minboard";

        db.query(sql, function(err, result){
                if(err) console.log(err);
                else{
                        var postcnt=result[0].postcnt;
                        var sql='select * from minboard';
                        if(val){
                                sql = sql + " where title like '%" + val + "%'";
                        }sql = sql + " order by mb_no desc limit ?, ?";
                        db.query(sql, [start, maxpost], function(err, result){
                                if(err) console.log(err);
                                else{
                                        var pager={
                                                pagecnt:postcnt%maxpost == 0 ? Math.trunc(postcnt/maxpost) : Math.trunc(postcnt/maxpost) +1, //총페이지수
                                                startpost:maxpost*pno-maxpost, //시작상품넘버
                                                endpost:maxpost*pno-1< postcnt ?  maxpost*pno-1 : postcnt-1  //마지막상품넘버
                                        } 
                                        if(req.session.displayname){
                                                var dname=req.session.displayname;
                                                res.render('minboard',{name:dname,id:req.session.user,result:result,pager:pager,pno:pno,query:query});  
                                        }else{
                                                res.render('minboard',{result:result,pager:pager,pno:pno,query:query});
                                        }   
                                }
                        })
                }
        })
}




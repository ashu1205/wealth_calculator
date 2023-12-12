
document.addEventListener("DOMContentLoaded", () => {
    const addUsers = document.getElementById('add-person');
    const doubleMoney=document.getElementById('double-money');
    const onlyMil=document.getElementById('millionaire');
      const sort=document.getElementById('sort');
      const calc=document.getElementById('total');

    // const userName = document.getElementById('uname');
    // const userSalary = document.getElementById('usalary');
    const userList=document.getElementById('user-container');
    const totalContainer=document.getElementById('total-sum');


    sort.addEventListener('click',sorting);
    addUsers.addEventListener('click', add);
    calc.addEventListener('click',totalSum)

    let added = [];
    id=0;
    async function add() {
        try {
            let result = await fetch("users.json");
            let data = await result.json();
            let users = data.users;

            // console.log(result);
            
            // console.log(data);
            
            // console.log(users);
            
           for(let i=0;i<users.length;i++) {
            
                let name = users[id].name;
                let salary = users[id].salary;
                
                const newUser=`<div class="wrapUser" id="user">
                <div>${name}</div>
                <div>${salary}</div>
            </div>`;

                // Uname.textContent = `${name}`;
                // Usalary.textContent = `${salary}`;

                // userName.appendChild(Uname);
                // userSalary.appendChild(Usalary);

                // userList.appendChild(newUser);
                userList.insertAdjacentHTML('beforeend', newUser);
                id++;
                added.push({ name, salary });
                
                console.log(added);
                
                break;
                
            }

            // console.log('added ', data);
        } catch (error) {
            console.error( error);
        }
    }
    function sorting(){

        if(added.length==0)
            return userList.innerHTML="No users added";

        userList.innerHTML='';

        added.sort((a,b)=>b.salary-a.salary);
        
        for(let i=0;i<added.length;i++) {
            
            let name = added[i].name;
            let salary = added[i].salary;
            
            const newUser=`<div class="wrapUser" id="user">
            <div>${name}</div>
            <div>${salary}</div>
        </div>`;

        userList.insertAdjacentHTML('beforeend', newUser);
            // id++;
            // added.push({ name, salary });
            
            
            
            
            
        }
        console.log(added);

    }
doubleMoney.addEventListener('click',double);
    function double(){
        if(added.length==0)
            return userList.innerHTML="No users added";

        userList.innerHTML='';
        
        // added.filter((a,b)=>b.salary-a.salary);
        let temp=added;
        added=[];
        for(let i=0;i<temp.length;i++) {
            
            let name = temp[i].name;
            let salary = temp[i].salary*2;
            
            const newUser=`<div class="wrapUser" id="user">
            <div>${name}</div>
            <div>${salary}</div>
        </div>`;

        userList.insertAdjacentHTML('beforeend', newUser);
            // id++;
            
            added.push({ name, salary });
            
            
            
            
            
        }
    }

    function totalSum(){
        totalContainer.innerHTML='';
        let totalWealth=0;
        for (let i = 0; i < added.length; i++) {
            totalWealth += added[i].salary;
        }

        let sum=`<P><STRONg>Total Wealth :</STRONg></p> <p><strong>${totalWealth}</strong></P>`;
        totalContainer.insertAdjacentHTML('beforeend',sum);
    }

});

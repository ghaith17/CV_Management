
import { Experience_Information } from "./Experience_Information";
import { Personal_Information } from "./Personal_Information";


export class CV
{
    public id:number=0;
    
    
    public name:string='';
    public personal_Info: Personal_Information =new Personal_Information();
    public experience_Info: Experience_Information= new Experience_Information();
}
export type Point=[number,number];
// Hand-drawn guide in a 100 by 100 coordinate system, shared with server scoring.
export const camoOutline:Point[][]=[
 [[18,60],[10,54],[17,43],[23,27],[30,42],[38,46],[43,34],[54,29],[66,34],[72,45],[78,54],[72,64],[57,69],[40,65],[33,58],[25,64],[18,60]],
 [[76,54],[83,43],[91,44],[96,51],[96,62],[90,70],[81,71],[75,66],[77,59],[83,57],[88,61],[86,65]],
 [[43,65],[42,80],[52,80]],[[62,68],[67,80],[77,80]],
 [[23,49],[26,46],[30,48],[31,52],[28,55],[24,54],[23,49]]
];
function samples(strokes:Point[][]){const out:Point[]=[];for(const stroke of strokes){if(stroke.length)out.push(stroke[0]);for(let i=1;i<stroke.length;i++){const a=stroke[i-1],b=stroke[i],n=Math.max(1,Math.ceil(Math.hypot(a[0]-b[0],a[1]-b[1])/1.5));for(let j=1;j<=n;j++)out.push([a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n]);}}return out;}
const guide=samples(camoOutline);
export function drawingScore(input:any){
 if(!Array.isArray(input)||input.length>80)return 0;let count=0;
 for(const stroke of input){if(!Array.isArray(stroke))return 0;for(const p of stroke){if(!Array.isArray(p)||p.length!==2||!p.every((n:any)=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=100))return 0;if(++count>1600)return 0;}}
 if(count<8)return 0;const drawn=samples(input);if(drawn.length>10000)return 0;
 const near=(a:Point,b:Point)=>Math.hypot(a[0]-b[0],a[1]-b[1])<3.5;
 const coverage=guide.filter(p=>drawn.some(q=>near(p,q))).length/guide.length;
 const precision=drawn.filter(p=>guide.some(q=>near(p,q))).length/drawn.length;
 return Math.max(0,Math.min(1,coverage*precision));
}

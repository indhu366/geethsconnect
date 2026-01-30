#include<iostream>
#include<string>
#include<vector>
using namespace std;
int BS(vector<int>,int,int,int);
int main(){
     vector<int> arr={1,2,3,4,5};
     int tar=4,st=0,end=sizeof(arr)-1;
    cout<<BS(arr,tar,st,end)<<endl;
    return 0;
}
int BS(vector<int> arr,int tar,int st,int end)
{
    if(st<=end){
        int mid=st+(end-st)/2;
        if(tar>arr[mid]){
            return BS(arr , tar,mid+1,end); 
        }else if(tar<arr[mid]){
            return BS(arr , tar,st,mid-1);
        }else{
            return mid;
        }
    }
    return -1;
}

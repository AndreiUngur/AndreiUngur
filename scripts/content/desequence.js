function desequence()
{
    //Get output areas
    var outputbox = document.getElementById("shift0");
    var outputbox2 = document.getElementById("shift1");
    var outputbox3 = document.getElementById("shift2");

    //Set titles for each and clear past text
    outputbox.innerHTML = "Shift of zero:<br><br>";
    outputbox2.innerHTML = "Shift of one:<br><br>";
    outputbox3.innerHTML = "Shift of two:<br><br>";

    //Sequence DNA in groups of three
    var text = document.getElementById("dna_input").value;
      					
    var counter;
    var shift0=0;
    var shift1=0;
    var shift2=0;
    outputbox2.innerHTML +=text[0]+"<br>";
    outputbox3.innerHTML +=text[0]+text[1]+"<br>";

    for(counter=0;counter<text.length;counter++)
    {
        outputbox.innerHTML+=text[counter];
        if(counter>=1)
        {
            outputbox2.innerHTML+=text[counter]
      		shift1++;
      		if(shift1%3==0){
      		outputbox2.innerHTML+="<br>";
      		shift1=0;
      	}
    }

        if(counter>=2)
        {
            outputbox3.innerHTML+=text[counter];
            shift2++;
            if(shift2%3==0)
            {
                outputbox3.innerHTML+="<br>";
                shift2=0;
            }
        }
        
        shift0++;
        if(shift0%3==0)
        {
            outputbox.innerHTML+='<br>';
            shift0=0;
        }
    }
}
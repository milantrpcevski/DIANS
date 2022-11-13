import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.channels.Pipe;
import java.util.Scanner;

public class PipeAndFilter {
    public static void main(String[] args) throws FileNotFoundException {
        Scanner scanner = new Scanner(new File("src/main/java/worldcities.csv"));
        scanner.useDelimiter(",");
        //Errors
//        Pipe<String> groupedCoursesPipe = new Pipe<String>();
//        LowercaseFilter lowercaseFilter = new LowercaseFilter();
//
//        groupedCoursesPipe.addFilter(lowercaseFilter);


//        Pipe<String> groupedCoursesPipe = new Pipe<String>();
//        LowercaseFilter lowercaseFilter = new LowercaseFilter();
//        groupedCoursesPipe.addFilter(lowercaseFilter);

        String res = "";
        while (scanner.hasNextLine()) {
//            String line = scanner.nextLine();
//            String resPipe1 = groupedCoursesPipe.runFilters(line);
//            String[] fields = resPipe1.split(",");
//
//            res=res.concat(resPipe1);
//        }
//        try{
//
//            File file = new File("output.txt");
//            FileWriter writer = new FileWriter(file);
//            writer.write(res);
//            writer.close();
//        }catch(IOException e)
//        {
//            System.out.println();
//        }
            System.out.println(scanner.nextLine());
        }
    }
}

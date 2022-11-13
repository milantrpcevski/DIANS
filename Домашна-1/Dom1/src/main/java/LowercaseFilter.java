public class LowercaseFilter implements Filter<String>{
    @Override
    public String execute(String input) {
        return input.toLowerCase();
    }
}

<?php

/* @Framework/FormTable/hidden_row.html.php */
class __TwigTemplate_32b46e757397c393bab18f056009ead27c473b1a5a1cfdc686b665c52a3c75b5 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_79b79b549451a420e8ff7220c2df0449684f0678ae8329749321fe0984476448 = $this->env->getExtension("native_profiler");
        $__internal_79b79b549451a420e8ff7220c2df0449684f0678ae8329749321fe0984476448->enter($__internal_79b79b549451a420e8ff7220c2df0449684f0678ae8329749321fe0984476448_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/FormTable/hidden_row.html.php"));

        // line 1
        echo "<tr style=\"display: none\">
    <td colspan=\"2\">
        <?php echo \$view['form']->widget(\$form) ?>
    </td>
</tr>
";
        
        $__internal_79b79b549451a420e8ff7220c2df0449684f0678ae8329749321fe0984476448->leave($__internal_79b79b549451a420e8ff7220c2df0449684f0678ae8329749321fe0984476448_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/FormTable/hidden_row.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <tr style="display: none">*/
/*     <td colspan="2">*/
/*         <?php echo $view['form']->widget($form) ?>*/
/*     </td>*/
/* </tr>*/
/* */
